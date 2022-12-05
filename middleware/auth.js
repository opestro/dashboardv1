
export default function ({ store, route, redirect }) {
  // Authentication
   
    if (!store.state.auth.user && route.path !== '/login') {

      return redirect('/login')
    
    }   
    
}