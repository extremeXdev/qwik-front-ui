export interface IRoute {
    path: string;
    method: string;
    label: string;
  }
  
  interface RoutesData {
    front: IRoute[];
    back: IRoute[];
  }
  
 function getRoutes(back_route:boolean): IRoute[] {
    const routesData: RoutesData = require('../data/routes.json');
    return back_route ? routesData.back : routesData.front;         // return front or back rout
  }

export function getRoute(label: string, back_route:boolean): IRoute | undefined {
    const routes = getRoutes(back_route);
    return routes.find((route) => route.label === label);
  }

//::::
const routesFront = getRoutes(false);
const routesBack  = getRoutes(true);
//:::: 

export { routesFront, routesBack };

//   function getRoute(path: string, method: string): Route | undefined {
//     const routes = getRoutes();
//     return routes.find((route) => route.path === path && route.method === method);
//   }
  
  
//   console.log(routes);

  // Output like:
  // [
  //   { path: "/home", method: "GET", description: "Home page" },
  //   { path: "/about", method: "GET", description: "About page" },
  //   { path: "/contact", method: "POST", description: "Contact form submission" },
  //   { path: "/api/users", method: "GET", description: "Get list of users" },
  //   { path: "/api/users/:id", method: "GET", description: "Get user by ID" }
  // ]