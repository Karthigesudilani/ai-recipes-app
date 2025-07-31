"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Input, 
  Button, 
  Textarea, 
  Modal, 
  Select, 
  SelectOption,
  useToast
} from "../../components/UI";
import { Heart, Star, Zap, Leaf, Apple, Utensils, Coffee, Cake } from "lucide-react";

export default function UIDemo() {
  const { success, error, info, warning } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    category: "",
    dietary: "",
    preferences: ""
  });

  // Dietary preferences options
  const dietaryOptions: SelectOption[] = [
    { value: "vegetarian", label: "Vegetarian", description: "No meat products", icon: <Leaf className="w-4 h-4" /> },
    { value: "vegan", label: "Vegan", description: "No animal products", icon: <Apple className="w-4 h-4" /> },
    { value: "pescatarian", label: "Pescatarian", description: "Fish and seafood only", icon: <Utensils className="w-4 h-4" /> },
    { value: "gluten-free", label: "Gluten-Free", description: "No gluten products", icon: <Cake className="w-4 h-4" /> },
    { value: "dairy-free", label: "Dairy-Free", description: "No dairy products", icon: <Coffee className="w-4 h-4" /> },
    { value: "keto", label: "Keto", description: "Low-carb, high-fat diet", icon: <Zap className="w-4 h-4" /> },
    { value: "paleo", label: "Paleo", description: "Whole foods only", icon: <Heart className="w-4 h-4" /> },
    { value: "none", label: "No Restrictions", description: "No dietary restrictions", icon: <Star className="w-4 h-4" /> }
  ];

  const categoryOptions: SelectOption[] = [
    { value: "breakfast", label: "Breakfast", description: "Morning meals" },
    { value: "lunch", label: "Lunch", description: "Midday meals" },
    { value: "dinner", label: "Dinner", description: "Evening meals" },
    { value: "dessert", label: "Dessert", description: "Sweet treats" },
    { value: "snack", label: "Snack", description: "Quick bites" },
    { value: "beverage", label: "Beverage", description: "Drinks and cocktails" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success("Form Submitted!", "Your form has been submitted successfully.");
    setFormData({ name: "", email: "", message: "", category: "", dietary: "", preferences: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            UI Components Demo
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explore our reusable UI components with interactive examples
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Examples */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Input Components</h2>
            
            <div className="space-y-4">
              <Input
                label="Basic Input"
                placeholder="Enter your name..."
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                fullWidth
              />

              <Input
                label="Email Input"
                type="email"
                placeholder="Enter your email..."
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                leftIcon={<Heart className="w-4 h-4" />}
                fullWidth
              />

              <Input
                label="Password Input"
                type="password"
                placeholder="Enter your password..."
                rightIcon={<Star className="w-4 h-4" />}
                fullWidth
              />

              <Input
                label="Error State"
                placeholder="This input has an error..."
                error="This field is required"
                fullWidth
              />

              <Input
                label="Helper Text"
                placeholder="Input with helper text..."
                helperText="This is some helpful information"
                fullWidth
              />

              <Input
                label="Disabled Input"
                placeholder="This input is disabled..."
                disabled
                fullWidth
              />

              <Input
                label="Small Input"
                placeholder="Small size..."
                size="sm"
                fullWidth
              />

              <Input
                label="Large Input"
                placeholder="Large size..."
                size="lg"
                fullWidth
              />
            </div>
          </motion.div>

          {/* Button Examples */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Button Components</h2>
            
            <div className="space-y-4">
              <Button
                onClick={() => success("Success!", "This is a success message.")}
                fullWidth
              >
                Primary Button
              </Button>

              <Button
                variant="secondary"
                onClick={() => info("Info!", "This is an info message.")}
                fullWidth
              >
                Secondary Button
              </Button>

              <Button
                variant="outline"
                onClick={() => warning("Warning!", "This is a warning message.")}
                fullWidth
              >
                Outline Button
              </Button>

              <Button
                variant="ghost"
                onClick={() => error("Error!", "This is an error message.")}
                fullWidth
              >
                Ghost Button
              </Button>

              <Button
                disabled
                onClick={() => {}}
                fullWidth
              >
                Disabled Button
              </Button>

              <Button
                size="sm"
                onClick={() => success("Small Button", "Small button clicked!")}
                fullWidth
              >
                Small Button
              </Button>

              <Button
                size="lg"
                onClick={() => info("Large Button", "Large button clicked!")}
                fullWidth
              >
                Large Button
              </Button>

              <Button
                leftIcon={<Heart className="w-4 h-4" />}
                onClick={() => success("With Icon", "Button with left icon!")}
                fullWidth
              >
                Button with Left Icon
              </Button>

              <Button
                rightIcon={<Star className="w-4 h-4" />}
                onClick={() => info("With Icon", "Button with right icon!")}
                fullWidth
              >
                Button with Right Icon
              </Button>
            </div>
          </motion.div>

          {/* Textarea Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Textarea Components</h2>
            
            <div className="space-y-4">
              <Textarea
                label="Basic Textarea"
                placeholder="Enter your message..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                fullWidth
              />

              <Textarea
                label="Textarea with Helper Text"
                placeholder="Enter your thoughts..."
                helperText="This is some helpful information about the textarea"
                rows={3}
                fullWidth
              />

              <Textarea
                label="Error State"
                placeholder="This textarea has an error..."
                error="This field is required"
                rows={3}
                fullWidth
              />

              <Textarea
                label="Disabled Textarea"
                placeholder="This textarea is disabled..."
                disabled
                rows={3}
                fullWidth
              />

              <Textarea
                label="Small Textarea"
                placeholder="Small size..."
                size="sm"
                rows={2}
                fullWidth
              />

              <Textarea
                label="Large Textarea"
                placeholder="Large size..."
                size="lg"
                rows={5}
                fullWidth
              />
            </div>
          </motion.div>

          {/* Select Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Select Components</h2>
            
            <div className="space-y-4">
              <Select
                label="Basic Select"
                options={categoryOptions}
                value={formData.category}
                onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                placeholder="Choose a category..."
                fullWidth
              />

              <Select
                label="Searchable Select"
                options={dietaryOptions}
                value={formData.dietary}
                onChange={(value) => setFormData(prev => ({ ...prev, dietary: value }))}
                placeholder="Choose dietary preference..."
                searchable
                fullWidth
              />

              <Select
                label="Multiple Select"
                options={dietaryOptions}
                value={formData.preferences}
                onChange={(value) => setFormData(prev => ({ ...prev, preferences: value }))}
                placeholder="Choose multiple preferences..."
                multiple
                fullWidth
              />

              <Select
                label="Select with Helper Text"
                options={categoryOptions}
                value=""
                onChange={() => {}}
                placeholder="Choose with helper text..."
                helperText="This is some helpful information about the select"
                fullWidth
              />

              <Select
                label="Error State"
                options={categoryOptions}
                value=""
                onChange={() => {}}
                placeholder="This select has an error..."
                error="This field is required"
                fullWidth
              />

              <Select
                label="Disabled Select"
                options={categoryOptions}
                value=""
                onChange={() => {}}
                placeholder="This select is disabled..."
                disabled
                fullWidth
              />

              <Select
                label="Small Select"
                options={categoryOptions.slice(0, 3)}
                value=""
                onChange={() => {}}
                placeholder="Small size..."
                size="sm"
                fullWidth
              />

              <Select
                label="Large Select"
                options={categoryOptions.slice(0, 3)}
                value=""
                onChange={() => {}}
                placeholder="Large size..."
                size="lg"
                fullWidth
              />
            </div>
          </motion.div>
        </div>

        {/* Modal Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Modal Component</h2>
          
          <Button
            onClick={() => setShowModal(true)}
            leftIcon={<Zap className="w-4 h-4" />}
          >
            Open Modal
          </Button>

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title="Example Modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                This is an example modal with a form inside. You can put any content here.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Name"
                  placeholder="Enter your name..."
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  fullWidth
                />

                <Select
                  label="Category"
                  options={categoryOptions}
                  value={formData.category}
                  onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  placeholder="Choose a category..."
                  fullWidth
                />

                <Textarea
                  label="Message"
                  placeholder="Enter your message..."
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  fullWidth
                />

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    onClick={() => {
                      success("Form Submitted!", "Your form has been submitted successfully.");
                      setShowModal(false);
                    }}
                    className="flex-1"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        </motion.div>

        {/* Toast Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Toast Notifications</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="secondary"
              onClick={() => success("Success!", "Operation completed successfully.")}
              fullWidth
            >
              Success Toast
            </Button>

            <Button
              variant="secondary"
              onClick={() => error("Error!", "Something went wrong.")}
              fullWidth
            >
              Error Toast
            </Button>

            <Button
              variant="secondary"
              onClick={() => warning("Warning!", "Please check your input.")}
              fullWidth
            >
              Warning Toast
            </Button>

            <Button
              variant="secondary"
              onClick={() => info("Info!", "Here's some information.")}
              fullWidth
            >
              Info Toast
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 