# Hotel Booking System

A modern React-based hotel booking application that allows users to configure travel details, select hotels and meals for each day, and export booking summaries as PDF.

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd booking
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```
   Production build will be generated in the `dist/` folder

5. **Preview production build**
   ```bash
   npm run preview
   ```

6. **Run tests**
   ```bash
   npm run test
   ```

7. **Run linter**
   ```bash
   npm run lint
   ```

## 🛠 Technology Choices and Justifications

- **React + TypeScript** — clean and predictable UI development  
- **Vite** — fast dev server and lightweight builds  
- **Redux** — centralized state for form data and daily selections  
- **Sass (SCSS)** — simple styling with nesting and variables  
- **pdfMake** — client-side PDF generation  
- **Jest + Testing Library** — testing components and logic  
- **ESLint** - сode linting, maintains consistent code style


## 🏗 Architecture Decisions

### Project Structure

```
src/
├── assets/           # Static assets
│   └── img/          # Images and icons
│
├── components/       # Reusable UI components
│   ├── BookingForm/  # Form fields for the initial configuration
│   ├── DailyTable/   # Table for daily hotel/meal selection
│   └── ...           # Other UI elements
│
├── steps/            # Components representing each step of the booking flow
│   ├── ConfigStep.tsx        # Step 1 — initial travel configuration
│   ├── DailyConfigStep.tsx   # Step 2 — per-day selections
│   └── SummaryStep.tsx       # Step 3 — final summary
│
├── data/             # Static data and constants
│
├── hooks/            # Custom React hooks
│
├── store/            # Redux store + reducers
│
└── utils/            # Helper functions
                      # (date generation, price calculation, formatting, PDF)
```

### Performance Optimizations

1. **Memoization**
   - `useMemo` for expensive calculations (`calculateSum`, `createDays`, validation)
   - `useCallback` for stable function references

2. **Optimized Calculations**
   - `calculateSum` uses `Map` for O(1) lookups instead of O(n) array searches
   - Prevents unnecessary recalculations on every render


### Board Type Logic

Business rules enforced in `selectionsReducer`:
- **FB (Full Board):** Both lunch and dinner can be selected
- **HB (Half Board):** Only one meal per day can be selected 
- **NB (No Board):** No meals can be selected

This logic is centralized in the reducer to ensure consistency across the application.

## ⚠️ Known Limitations & Future Improvements

### Current Limitations

- All data is stored locally
- No server-side persistence or user accounts
- Basic PDF styling with pdfMake
- No multi-language support

### Future Improvements

- REST API for data persistence
- Multi-language support (i18n)
- Increase test coverage

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

## 📄 License

This project is provided as part of a technical assessment.
