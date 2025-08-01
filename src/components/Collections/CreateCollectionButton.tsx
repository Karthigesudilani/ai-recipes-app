import { Plus } from "lucide-react";
import { Button } from "../UI";

interface CreateCollectionButtonProps {
  onClick: () => void;
}

export default function CreateCollectionButton({ onClick }: CreateCollectionButtonProps) {
  return (
    <div className="text-center mb-8">
      <Button
        onClick={onClick}
        leftIcon={<Plus className="w-4 h-4" />}
        variant="primary"
        size="md"
        rounded="lg"
      >
        Create New Collection
      </Button>
    </div>
  );
} 