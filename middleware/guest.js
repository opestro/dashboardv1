
export default async function ({ store, route, redirect }) {
    // Not Authentication
     
      if (store.state.auth.User && route.path !== '/') {
  
        return redirect('/')
      
      }   
      
  }