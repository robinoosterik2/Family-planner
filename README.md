# Family Planner

A Laravel application using Docker (Laravel Sail) with MySQL.

## 🚀 Getting Started

### Prerequisites

- Docker installed
- Composer installed

### Setup

Clone the repository:

```bash
git clone https://github.com/your-username/family-planner.git
cd family-planner
```

### Install PHP Dependencies

```bash
composer install
```

### generate the application key

```bash
./vendor/bin/sail up -d
./vendor/bin/sail artisan key:generate
```

### Run Migrations

```bash
./vendor/bin/sail artisan migrate
```

### Run the Application

```bash
npm run dev:sail
```


### Create placeholder images
convert -size ...x... xc:white <name>.png