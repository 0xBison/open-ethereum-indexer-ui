import { AlertCircle, X } from "lucide-react";

interface ConnectionStatusBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export function ConnectionStatusBanner({
  isVisible,
  onDismiss,
}: ConnectionStatusBannerProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute top-0 left-0 right-0 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <p>Connection to backend failed.</p>
      </div>
      <button onClick={onDismiss} className="text-red-700 hover:text-red-900">
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
