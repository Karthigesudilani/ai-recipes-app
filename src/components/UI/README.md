# UI Components Library

A collection of reusable, accessible, and customizable UI components for the AI Recipes App.

## Components

### Input
A flexible input component with support for icons, validation states, and various sizes.

**Features:**
- Left and right icons
- Error and helper text
- Multiple sizes (sm, md, lg)
- Full width option
- Dark mode support
- Focus animations

**Usage:**
```tsx
import { Input } from '../UI';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email..."
  leftIcon={<Mail className="w-4 h-4" />}
  error="Invalid email address"
  fullWidth
/>
```

### Button
A versatile button component with multiple variants and states.

**Features:**
- Multiple variants (primary, secondary, outline, ghost)
- Left and right icons
- Multiple sizes (sm, md, lg)
- Loading state
- Disabled state
- Full width option

**Usage:**
```tsx
import { Button } from '../UI';

<Button
  variant="primary"
  leftIcon={<Plus className="w-4 h-4" />}
  onClick={handleClick}
  fullWidth
>
  Add Item
</Button>
```

### Textarea
A textarea component with validation and helper text support.

**Features:**
- Error and helper text
- Multiple sizes (sm, md, lg)
- Full width option
- Dark mode support
- Resizable option

**Usage:**
```tsx
import { Textarea } from '../UI';

<Textarea
  label="Description"
  placeholder="Enter your description..."
  helperText="Maximum 500 characters"
  rows={4}
  fullWidth
/>
```

### Modal
A modal component with customizable content and animations.

**Features:**
- Customizable size (sm, md, lg, xl)
- Animated entrance/exit
- Backdrop blur
- Close on backdrop click
- Custom header and content

**Usage:**
```tsx
import { Modal } from '../UI';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Example Modal"
  size="md"
>
  <div>Your modal content here</div>
</Modal>
```

### Select
A dropdown/select component with search, multiple selection, and icons support.

**Features:**
- Single and multiple selection
- Searchable options
- Option icons and descriptions
- Error and helper text
- Multiple sizes (sm, md, lg)
- Keyboard navigation
- Dark mode support

**Usage:**
```tsx
import { Select, SelectOption } from '../UI';

const options: SelectOption[] = [
  { value: "option1", label: "Option 1", description: "Description for option 1" },
  { value: "option2", label: "Option 2", icon: <Star className="w-4 h-4" /> }
];

<Select
  label="Choose an option"
  options={options}
  value={selectedValue}
  onChange={handleChange}
  placeholder="Select an option..."
  searchable
  fullWidth
/>
```

### Toast
A toast notification system with multiple types and animations.

**Features:**
- Multiple types (success, error, info, warning)
- Customizable duration
- Multiple positions
- Auto-close option
- Progress bar
- Icons and close button
- Animated entrance/exit

**Usage:**
```tsx
import { useToast } from '../UI';

const { success, error, info, warning } = useToast();

// Show a toast
success("Success!", "Operation completed successfully.");

// In your component, add the ToastContainer
import { ToastContainer } from '../UI';

<ToastContainer />
```

## Hooks

### useToast
A hook for managing toast notifications.

**Features:**
- Add toasts with different types
- Remove individual toasts
- Clear all toasts
- Convenience methods (success, error, info, warning)

**Usage:**
```tsx
import { useToast } from '../UI';

const { success, error, info, warning, addToast, removeToast, clearToasts } = useToast();

// Convenience methods
success("Success!", "Operation completed successfully.");
error("Error!", "Something went wrong.");
info("Info!", "Here's some information.");
warning("Warning!", "Please check your input.");

// Manual toast
addToast({
  type: 'success',
  title: 'Custom Toast',
  message: 'This is a custom toast',
  duration: 10000,
  position: 'bottom-center'
});
```

## Design System

All components follow a consistent design system:

- **Colors**: Orange/red gradient theme with proper contrast
- **Spacing**: Consistent padding and margins
- **Typography**: Clear hierarchy with proper font weights
- **Animations**: Smooth transitions using Framer Motion
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Dark Mode**: Full dark mode support
- **Responsive**: Mobile-first design

## Installation

All components are available through the UI index:

```tsx
import { 
  Input, 
  Button, 
  Textarea, 
  Modal, 
  Select, 
  ToastContainer,
  useToast 
} from '../UI';
```

## TypeScript Support

All components are fully typed with TypeScript interfaces:

- `InputProps`
- `ButtonProps`
- `TextareaProps`
- `ModalProps`
- `SelectProps`
- `SelectOption`
- `ToastProps`
- `ToastContainerProps`
- `ToastData` 