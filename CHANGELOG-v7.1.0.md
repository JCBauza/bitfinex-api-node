# Changelog - v7.1.0

## 🚀 **Version 7.1.0** - June 2025

### ✨ **New Features**

- **Modernized Dependencies**: Updated all 47 dependencies to latest versions
- **Node.js 20+ Support**: Minimum Node.js requirement updated to v20.0.0
- **Enhanced npm Scripts**: Added dev, test:watch, docs:serve, clean, fresh-install
- **Environment Configuration**: Added comprehensive `.env.example` and setup guide
- **Documentation**: Complete technical review and improvement proposals

### 🔧 **Improvements**

- **Performance**: Optimized WebSocket message handling
- **Compatibility**: Fixed critical ws v8+ Buffer/string compatibility issue
- **Configuration**: Centralized environment variable management
- **Development**: Enhanced debugging and development experience
- **Testing**: Improved test coverage and validation scripts

### 🛠️ **Breaking Changes**

- **Node.js**: Minimum version now 20.0.0 (was 16.0.0)
- **npm**: Minimum version now 10.0.0 (was 8.0.0)
- **Dependencies**: Major version updates for ws, lossless-json, mocha, blessed-contrib

### 🐛 **Bug Fixes**

- **WebSocket**: Fixed Buffer handling for ws v8+ compatibility
- **Reconnection**: Improved connection stability
- **Error Handling**: Better error messages and debugging information

### 📚 **Documentation**

- **Setup Guide**: Comprehensive environment configuration documentation
- **Technical Review**: Detailed code analysis and improvement proposals
- **Modernization**: Complete changelog of all changes made
- **Examples**: All REST and WebSocket examples validated and documented

### 🔒 **Security**

- **Dependencies**: Updated to address known vulnerabilities
- **Environment**: Secure credential management with .env.example
- **API Keys**: Improved handling and documentation of authentication

### 🧪 **Testing**

- **Validation**: All 228 tests passing, 3 pending (non-critical)
- **Examples**: Both public and authenticated examples verified
- **Integration**: Real API testing with live credentials
- **Linting**: Code quality maintained with zero linting errors

### 📦 **Dependencies Updated**

Major version updates:

- `ws`: v7 → v8+ (with compatibility fix)
- `lossless-json`: v1 → v2+
- `mocha`: v9 → v10+
- `blessed-contrib`: v4 → v5+
- All other dependencies to latest stable versions

### 🎯 **Migration Guide**

1. Update Node.js to v20.0.0 or higher
2. Update npm to v10.0.0 or higher
3. Run `npm run fresh-install` to update dependencies
4. Copy `.env.example` to `.env` and configure your API credentials
5. Run tests with `npm test` to verify everything works

### 📈 **What's Next**

See `IMPROVEMENT-PROPOSALS.md` for detailed roadmap including:

- TypeScript migration
- Enhanced error handling
- Smart reconnection with backoff
- Connection pooling
- Advanced debugging tools

---

**Full Changelog**: [v7.0.0...v7.1.0](https://github.com/JCBauza/bitfinex-api-node/compare/v7.0.0...v7.1.0)
