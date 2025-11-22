export const AIWarningModal = ({ aiResult, onCancel, onContinue }) => {
  if (!aiResult) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[200]">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Image Suggestion</h3>

        {!aiResult.isFood && (
          <p className="text-yellow-700 mb-2">
            • We couldn't confidently detect food in this image. Please
            double-check before posting.
          </p>
        )}

        {aiResult.isBlurry && (
          <p className="text-yellow-700 mb-2">
            • This photo seems slightly blurry. A clearer picture helps
            receivers understand better.
          </p>
        )}

        {aiResult.clarityScore < 5 && (
          <p className="text-yellow-700 mb-2">
            • Image clarity looks low. Uploading a sharper picture may help
            others.
          </p>
        )}

        <p className="text-gray-600 mt-3">
          You can continue with the current photo or upload a new one.
        </p>

        <div className="flex justify-end gap-3 mt-5">
          <button className="btn" onClick={onCancel}>
            Choose Another Photo
          </button>
          <button className="btn btn-primary" onClick={onContinue}>
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
};
