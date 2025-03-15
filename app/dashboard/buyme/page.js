"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { toast } from "sonner";

const BuyMeCoffee = () => {
  const onPaymentSuccess = ()=>{
    toast("Payment Successful!");
    toast("Thank Your Buying Me A Coffee!!")
  }
  return (
    <div className="h-[100%] flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-3">
        Buy Me a Coffee ☕
      </h1>
      <p className="text-md text-gray-600 mb-3 text-center">
        Love the work? Show your support by buying me a coffee! <br />
        Every cup fuels more lines of code and creative solutions.
      </p>
      <img src="/coffee_cup.jpg" alt="Coffee Cup" className="h-25 m-3" />

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8">
          {/* $1 Donation Card */}
          <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">$1 Coffee</h2>
              <p className="mt-2 sm:mt-4 text-gray-600">
                A small gesture that means a lot! Every dollar helps me stay
                fueled and motivated.
              </p>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700"> 1 coffee added to the stack </span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700"> Small token of appreciation </span>
              </li>
            </ul>
            <div className="mt-5">
            <PayPalButtons 
            onApprove={()=>onPaymentSuccess()}
            onCancel={()=>console.log("Payment Cancelled")}
            createOrder={(data,actions)=>{
              return actions?.order?.create(
                {
                  purchase_units:[
                    {
                      amount: {
                        value:5,
                        currency_code:'USD'
                      }
                    }
                  ]
                }
              )
            }}/>
            </div>
          </div>

          {/* $5 Donation Card */}
          <div className="rounded-2xl border border-indigo-600 p-6 shadow-sm sm:px-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">$5 Coffee</h2>
              <p className="mt-2 sm:mt-4 text-gray-600">
                A generous contribution that keeps the creativity flowing! Your
                support is invaluable.
              </p>
            </div>
            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700"> 5 coffees to fuel the grind </span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700"> Boosts my productivity </span>
              </li>
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-indigo-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <span className="text-gray-700"> Helps me deliver better work </span>
              </li>
            </ul>
            <div className="mt-5">
            <PayPalButtons 
            onApprove={()=>onPaymentSuccess()}
            onCancel={()=>console.log("Payment Cancelled")}
            createOrder={(data,actions)=>{
              return actions?.order?.create(
                {
                  purchase_units:[
                    {
                      amount: {
                        value:5,
                        currency_code:'USD'
                      }
                    }
                  ]
                }
              )
            }}/>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">Thank you for supporting me! ❤️</p>
    </div>
  );
};

export default BuyMeCoffee;
