
export default async function ({ store, route, redirect }) {
    // Not Authentication
     
      if (store.state.auth.user && route.path !== '/') {
  
        return redirect('/')
      
      }   
      
  }