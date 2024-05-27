import React, { useState, useRef, useEffect } from "react";
import AddRecipesForm from "./AddRecipesForm";
import RecipesTable from "./RecipesTable";

export default function TabsLgPill() {
  // State to manage the currently selected tab
  const [tabSelected, setTabSelected] = useState(1);

  // Reference to the wrapper element containing tab buttons
  const wrapperRef = useRef(null);

  // Function to handle keyboard navigation between tabs
  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      // Right arrow key pressed
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        // Check if focus is within the wrapper element
        if (tabSelected >= 1 && tabSelected < 3) {
          // Move to the next tab
          setTabSelected(tabSelected + 1);
        } else {
          // Wrap around to the first tab
          setTabSelected(1);
        }
      }
    }

    if (e.keyCode === 37) {
      // Left arrow key pressed
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        // Check if focus is within the wrapper element
        if (tabSelected > 1 && tabSelected <= 3) {
          // Move to the previous tab
          setTabSelected(tabSelected - 1);
        } else {
          // Wrap around to the last tab
          setTabSelected(3);
        }
      }
    }
  };

  // Add event listener for keyboard navigation on mount
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      {/* Tab navigation */}
      <section className="max-w-full">
        <ul className="flex items-center gap-2" role="tablist" ref={wrapperRef}>
          {/* Tab buttons */}
          <li className="" role="presentation">
            <button
              className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded px-6 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected === 1
                  ? "bg-primary text-white hover:bg-black focus:bg-emerald-700 disabled:bg-emerald-300"
                  : "w-full justify-self-center stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-emerald-300"
              }`}
              id="tab-label-1e"
              role="tab"
              aria-setsize="3"
              aria-posinset="1"
              tabIndex={tabSelected === 1 ? "0" : "-1"}
              aria-controls="tab-panel-1e"
              aria-selected={tabSelected === 1}
              onClick={() => setTabSelected(1)}
            >
              <span>Add Recipe</span>
            </button>
          </li>
          <li className="" role="presentation">
            <button
              className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded px-6 text-sm font-medium tracking-wide transition duration-300 focus-visible:outline-none disabled:cursor-not-allowed ${
                tabSelected === 2
                  ? "bg-primary text-white hover:bg-black focus:bg-emerald-700 disabled:bg-emerald-300"
                  : "w-full justify-self-center stroke-slate-700 text-slate-700 hover:bg-emerald-50 hover:stroke-emerald-500 hover:text-emerald-500 focus:bg-emerald-50 focus:stroke-emerald-600 focus:text-emerald-600 disabled:text-emerald-300"
              }`}
              id="tab-label-2e"
              role="tab"
              aria-setsize="3"
              aria-posinset="2"
              tabIndex={tabSelected === 2 ? "0" : "-1"}
              aria-controls="tab-panel-2e"
              aria-selected={tabSelected === 2}
              onClick={() => setTabSelected(2)}
            >
              <span>All Recipe</span>
            </button>
          </li>
        </ul>

        {/* Tab content */}
        <div className="">
          {/* Add Recipe tab panel */}
          <div
            className={`px-6 py-4 ${
              tabSelected === 1 ? "" : "hidden"
            }`}
            id="tab-panel-1e"
            aria-hidden={tabSelected !== 1}
            role="tabpanel"
            aria-labelledby="tab-label-1e"
            tabIndex="-1"
          >
            <AddRecipesForm />
          </div>

          {/* All Recipe tab panel */}
          <div
            className={`px-6 py-4 ${
              tabSelected === 2 ? "" : "hidden"
            }`}
            id="tab-panel-2e"
            aria-hidden={tabSelected !== 2}
            role="tabpanel"
            aria-labelledby="tab-label-2e"
            tabIndex="-1"
          >
            <RecipesTable />
          </div>
        </div>
      </section>
    </>
  );
}
