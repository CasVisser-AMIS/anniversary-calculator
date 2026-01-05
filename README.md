# Anniversary Calculator

Find something to celebrate every day!

An Angular web application that calculates various anniversaries from a chosen date, including weeks, months, years, and special milestones like 100 days, 500 days, etc.

## Features

- 📅 Enter any date to calculate anniversaries
- 🎉 See multiple milestone anniversaries (1 week, 100 days, 1 year, 5 years, etc.)
- 🔗 Share dates via URL using YYYY-MM-DD format
- 📱 Responsive design for mobile and desktop
- 🎨 Beautiful gradient UI
- ⏰ Shows countdown for upcoming anniversaries
- 📊 Filter by upcoming, past, or all anniversaries

## Technology Stack

- **Frontend:** Angular v21
- **Language:** TypeScript
- **Styling:** CSS
- **Deployment:** Azure Static Web Apps

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CasVisser-AMIS/anniversary-calculator.git
cd anniversary-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/anniversary-app/` directory.

## Usage

### Basic Usage

1. Open the application in your browser
2. Select a date using the date picker
3. View all the anniversary milestones

### URL Parameters

You can pass a date directly in the URL using the `date` parameter in YYYY-MM-DD format:

```
http://localhost:4200/?date=2020-01-15
https://your-app.azurestaticapps.net/?date=2020-01-15
```

## Deployment to Azure

### Option 1: Azure Static Web Apps (Recommended)

1. Create an Azure Static Web App in the Azure Portal
2. Connect it to your GitHub repository
3. Add the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to your GitHub repository
4. The GitHub Actions workflow will automatically deploy on push to main/master

### Option 2: Azure App Service

1. Build the application:
```bash
npm run build
```

2. Deploy the contents of `dist/anniversary-app/` to Azure App Service
   - The included `web.config` file will handle routing

### Configuration Files

- **staticwebapp.config.json**: Configuration for Azure Static Web Apps
- **src/web.config**: Configuration for Azure App Service (IIS)
- **.github/workflows/azure-static-web-apps.yml**: CI/CD workflow for automatic deployment

## Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run watch` - Build and watch for changes

## Project Structure

```
anniversary-calculator/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml   # Azure deployment workflow
├── src/
│   ├── app/
│   │   ├── anniversary.service.ts       # Anniversary calculation logic
│   │   ├── calculator.component.ts      # Main calculator component
│   │   ├── app.ts                       # Root component
│   │   ├── app.config.ts                # App configuration
│   │   └── app.routes.ts                # Routing configuration
│   ├── index.html                       # Main HTML file
│   ├── main.ts                          # Application entry point
│   ├── styles.css                       # Global styles
│   └── web.config                       # IIS configuration
├── angular.json                         # Angular CLI configuration
├── package.json                         # Dependencies
├── staticwebapp.config.json             # Azure Static Web Apps config
└── tsconfig.json                        # TypeScript configuration
```

## Anniversary Milestones Calculated

The application calculates the following types of anniversaries:

- **Weekly:** 1, 2, 3 weeks, and special week milestones (10, 25, 50, 75, 100+ weeks)
- **Days:** 7, 14, 21, 30, 50, 100, 500, 1000 days
- **Years:** 1-10 years

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

