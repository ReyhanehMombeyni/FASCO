import { StockAlertProps } from "@/src/types/products";

export const StockAlert = ({ currentStock, LOW_STOCK_THRESHOLD }: StockAlertProps) => {
  const initialStock = currentStock > LOW_STOCK_THRESHOLD ? currentStock : LOW_STOCK_THRESHOLD;
  const lowStockPercent = (currentStock / initialStock) * 100;
  return (
    <div className="mt-5 lg:mt-8">
      {currentStock <= LOW_STOCK_THRESHOLD && (
        <div className="text-xs">
          <p className="text-gray-600 mb-1">
            Only <span className="font-bold text-red-600">{currentStock}</span>{" "}
            item(s) left in stock!
          </p>

          <div className="w-full bg-gray-200 rounded-full h-1">
            <div
              className="bg-red-500 h-1 rounded-full transition-all duration-500"
              style={{
                width: `${lowStockPercent}%`,
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};
