// src/constants/strings.js

export const APP_STRINGS = {
  BRAND: {
    NAME_INITIALS: "SGEH",
    FULL_NAME: "Shri Gajanan Electricals & Hardware",
    SUB_TEXT: "Electricals & Hardware",
    VERSION: "v1.0.0",
    MODE: "Admin Mode",
    STATUS_LIVE: "Live Management",
    LOGOUT: "Sign Out" // Added constant string for logout button
  },
  
  TABS: {
    DASHBOARD: "Dashboard",
    INVENTORY: "Inventory",
    REPAIRS: "Repairing Service"
  },
  
  NAVBAR: {
    OVERVIEW: "Shop Overview",
    MANAGEMENT_SUFFIX: " Management"
  },

  DASHBOARD: {
    TITLE: "Welcome to your Shop OS",
    DESCRIPTION: "Here you will see analytics like low stock warnings, revenue, and pending repairs at a glance."
  },

  INVENTORY: {
    TITLE: "Manage Products",
    DESCRIPTION: "This is where you can add electrical accessories, edit prices, and look up stock details."
  },

  INVENTORY_VIEWS: {
    GRID: "Grid View",
    LIST: "List View",
    OUT_OF_STOCK: "Out of Stock",
    LOW_STOCK: "Low Stock Warning",
    BUYING_PRICE: "Cost:",
    SELLING_PRICE: "Selling Price:"
  },

  REPAIRS: {
    TITLE: "Repair Tracker",
    DESCRIPTION: "Log new repair items (mixers, fans, motors) and keep tabs on payments and completion dates."
  },
  LOGIN: {
    HEADING: "Sign in to Shop OS",
    SUBHEADING: "Access your dashboard to manage stock and repairs.",
    USERNAME_LABEL: "Username or Email",
    USERNAME_PLACEHOLDER: "Enter admin username",
    PASSWORD_LABEL: "Password",
    PASSWORD_PLACEHOLDER: "••••••••",
    BUTTON_TEXT: "Sign In",
    ERROR_INVALID: "Invalid username or password. Please try again."
    },
  INVENTORY_FORM: {
    MODAL_TITLE: "Add Stock Material",
    PRODUCT_NAME: "Product Name *",
    BRAND: "Brand / Manufacturer *",
    CATEGORY: "Category *",
    QUANTITY: "Initial Quantity *",
    UNIT: "Unit *",
    RATE: "Selling Rate (₹) *",
    PURCHASE_RATE: "Purchase Rate (₹) *",
    DEALER_NAME: "Dealer / Vendor Name",
    SUBMIT_BTN: "Save to Stock Ledger",
    CLOSE_BTN: "Cancel"
},
  CATEGORIES: ["Electrical", "Hardware", "Stationary"],
  UNITS: ["pcs", "box", "meter", "bundle", "kg", "packet"],
  IMAGE_LABEL: "Product Image",
  IMAGE_PLACEHOLDER: "Click to upload product image",
  IMAGE_REMOVE: "Remove Image"
};