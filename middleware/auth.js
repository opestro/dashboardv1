
export default async function ({ store, route, redirect }) {
  // Authentication
   
    if (!store.state.auth.User && route.path !== '/login') {

      return redirect('/login')
    
    }   
    
}