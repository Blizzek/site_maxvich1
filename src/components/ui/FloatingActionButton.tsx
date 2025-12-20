import { Button } from "@/components/ui/Button";
import { Calculator } from "lucide-react";

export const FloatingActionButton: React.FC = () => {
  return (
    <div className="fixed right-4 bottom-6 z-40">
      <Button
        size="lg"
        className="shadow-xl animate-bounce bg-primary-500 hover:bg-primary-600"
        href="#contacts"
      >
        <Calculator className="w-5 h-5" />
        Заказать расчёт
      </Button>
    </div>
  );
};
