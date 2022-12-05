
export default function ({ store, route, redirect }) {
    // Not Authentication
     
      if (store.state.auth.user && route.path !== '/orders') {
        return redirect('/orders')
      }   
      
  }