import React, { useState } from "react";

const MortgageCalculator = () => {
  const [inputs, setInputs] = useState({
    homePrice: "",
    downPayment: "",
    interestRate: "",
    loanTerm: "",
  });

  const [hasCalculated, setHasCalculated] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setInputs((prev) => ({ ...prev, [name]: "" }));
      return;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;
    if ((name === "downPayment" || name === "interestRate") && numValue < 0) return;
    if (name === "loanTerm" && numValue < 1) return;
    setInputs((prev) => ({ ...prev, [name]: numValue }));
  };

  const handleReset = () => {
    setInputs({ homePrice: "", downPayment: "", interestRate: "", loanTerm: "" });
    setHasCalculated(false);
  };

  const handleCalculate = () => {
    if (inputs.homePrice > 0 && inputs.loanTerm > 0) {
      setHasCalculated(true);
    }
  };

  // Calculations
  const homePrice = inputs.homePrice || 0;
  const downPayment = inputs.downPayment || 0;
  const interestRate = inputs.interestRate || 0;
  const loanTerm = inputs.loanTerm || 0;

  const downPaymentPercentage = homePrice > 0 ? (downPayment / homePrice) * 100 : 0;
  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyInterestRate = interestRate / 12 / 100;
  const totalMonths = loanTerm * 12;

  const emi =
    monthlyInterestRate > 0 && totalMonths > 0 && loanAmount > 0
      ? (loanAmount *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalMonths)) /
        (Math.pow(1 + monthlyInterestRate, totalMonths) - 1)
      : 0;

  const totalInterest = emi * totalMonths - loanAmount;
  const totalPayment = emi * totalMonths + downPayment;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Calculator</h1>
      
      {/* Horizontal Input Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price(₹)</label>
          <input
            type="number"
            name="homePrice"
            min="0"
            value={inputs.homePrice}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 5000000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (₹)</label>
          <input
            type="number"
            name="downPayment"
            min="0"
            value={inputs.downPayment}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 1000000"
          />
          {homePrice > 0 && (
            <p className="text-xs text-gray-500 mt-1">{downPaymentPercentage.toFixed(1)}%</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (years)</label>
          <input
            type="number"
            name="loanTerm"
            min="1"
            max="30"
            value={inputs.loanTerm}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
          <input
            type="number"
            name="interestRate"
            min="0"
            step="0.01"
            value={inputs.interestRate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 7.5"
          />
        </div>
      </div>

      {/* Action Buttons - Horizontal */}
      <div className="flex justify-end gap-4 mb-6">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          onClick={handleCalculate}
          disabled={!inputs.homePrice || !inputs.loanTerm}
          className={`px-6 py-2 rounded-md ${
            inputs.homePrice && inputs.loanTerm
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Calculate
        </button>
      </div>

      {/* Horizontal Results Grid */}
      {hasCalculated && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* EMI Summary */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Monthly Payment</h3>
              <p className="text-2xl font-bold text-blue-600">
                ₹{Math.round(emi).toLocaleString("en-IN")}
              </p>
            </div>

            {/* Loan Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Loan Details</h3>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Amount:</span>
                  <span className="text-sm">₹{loanAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Down Payment:</span>
                  <span className="text-sm">
                    ₹{downPayment.toLocaleString("en-IN")} ({downPaymentPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Rate:</span>
                  <span className="text-sm">{interestRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Term:</span>
                  <span className="text-sm">{loanTerm} years</span>
                </div>
              </div>
            </div>

            {/* Interest */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Total Interest</h3>
              <p className="text-xl font-bold text-red-500 mb-2">
                ₹{Math.round(totalInterest).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500">
                {((totalInterest / loanAmount) * 100).toFixed(1)}% Of price
              </p>
            </div>

            {/* Total Payment */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-medium text-gray-700 mb-2">Total Payment</h3>
              <p className="text-xl font-bold text-green-600">
                ₹{Math.round(totalPayment).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500">
                {((totalPayment / homePrice) * 100).toFixed(1)}% of home price
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;