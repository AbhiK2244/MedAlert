import { useParams } from "react-router-dom";
import { useGetReportByIdQuery } from "../../services/analysisReport";

const AnalysisReport = () => {
  const params = useParams();
  const reportId = params?.reportId;
  const { data, isFetching } = useGetReportByIdQuery(reportId);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading report...</p>
      </div>
    );
  }
  const {
    ocrResult: { productName, description, ingredients },
    updatedAt,
    summary,
    ocrResult,
    consumptionGuidelines,
    foodSuggestions,
    usefulIngredients,
    harmfulIngredients,
    userNotes,
  } = data?.data;

  const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-blue-50 w-full flex justify-center">
      <div className="max-w-4xl mx-auto m-0 md:m-4 p-4 md:px-10 md:pt-10 bg-white rounded-md shadow-lg font-sans text-gray-800">
        <header className="border-b border-gray-200 pb-6 mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {productName}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Analysis Date: {formattedDate}
          </p>
        </header>

        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            Executive Summary
          </h2>
          <p className="leading-relaxed text-gray-700">{summary}</p>
        </section>

        {/* Product Description */}
        {description !== null && (
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
              Product Description
            </h2>
            <p className="leading-relaxed text-gray-700">{description}</p>
          </section>
        )}

        {/* Key Ingredients */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            Key Ingredients Detected
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {ocrResult.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-teal-50 text-teal-800 py-2 px-4 rounded-full font-medium text-sm"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </section>

        {/* Consumption Guidelines */}
        <section className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
            Consumption Guidelines
          </h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-5 rounded-r-lg">
            <p className="leading-relaxed text-gray-700">
              {consumptionGuidelines}
            </p>
          </div>
        </section>

        {/* Food Suggestions */}
        {foodSuggestions !== "N/A" && (
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
              Serving Suggestions
            </h2>
            <p className="leading-relaxed text-gray-700">{foodSuggestions}</p>
          </section>
        )}

        {/* Responsive Grid: Stacks on mobile (col-1), two columns on medium screens and up (md:col-2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Useful Ingredients */}
          {usefulIngredients?.length > 0 && (
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="text-green-500 mr-2 text-2xl">✅</span>{" "}
                Beneficial Ingredients
              </h2>
              <div className="space-y-4">
                {usefulIngredients.map((item, index) => (
                  <div
                    key={index}
                    className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg"
                  >
                    <h3 className="font-bold text-lg text-green-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 my-1">{item.impact}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Limit:</strong> {item.quantityLimit}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Harmful Ingredients */}
          {harmfulIngredients?.length > 0 && (
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span className="text-red-500 mr-2 text-2xl">⚠️</span>{" "}
                Ingredients to Watch
              </h2>
              <div className="space-y-4">
                {harmfulIngredients.map((item, index) => (
                  <div
                    key={index}
                    className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg"
                  >
                    <h3 className="font-bold text-lg text-red-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 my-1">{item.impact}</p>
                    <p className="text-sm text-gray-500">
                      <strong>Rationale:</strong> {item.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* User Notes */}
        {userNotes && (
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4">
              Your Notes
            </h2>
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 sm:p-5 rounded-r-lg">
              <p className="leading-relaxed text-gray-700">{userNotes}</p>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-gray-400 mt-10 border-t border-gray-200 pt-1">
          <p className="text-xs italic text-left">
            Note: This report is generated by AI and is meant for general
            informational purpose
          </p>
          <p className="mt-2">© {new Date().getFullYear()} MedAlert. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AnalysisReport;
