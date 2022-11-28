export default function ({ store, redirect }) {
    // If the user is not authenticated
    console.log(store.state.auth.user)
    if (store.state.auth.user === 'null') {
      return redirect('/LoginPage')
    }
  }