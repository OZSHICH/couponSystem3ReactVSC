class Globals {}

class DevelopmentGlobals extends Globals {
  public urls = {
    welcome: "http://localhost:8080/api/welcome",
    admin: "http://localhost:8080/api/admin",
    company: "http://localhost:8080/api/companies",
    customer: "http://localhost:8080/api/customers",
  };
}

class ProductionGlobals extends Globals {
  public urls = {
    welcome: "/api/welcome",
    admin: "/api/admin",
    company: "/api/companies",
    customer: "/api/customers",
  };
}

const globals =
  process.env.NODE_ENV === "production" ? new ProductionGlobals() : new DevelopmentGlobals();

export default globals;
