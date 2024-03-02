const AmazonCognitoIdentity = window.AmazonCognitoIdentity;

const Logout = () => {
  const poolData = {
    UserPoolId: "us-east-1_j65v1tuH7", // Your user pool id here
    ClientId: "77fs4nul5q1k9lvseplddqbo88" // Your client id here
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const handleLogout = () => {
    const cognitoUser = userPool.getCurrentUser();
    
    if (cognitoUser) {
      cognitoUser.signOut();

      // Optionally, remove the token from local storage
      localStorage.removeItem('token');

      // Redirect to login page or refresh the page
      window.location.href = "index.html";
    } else {
      alert("No user is currently logged in.");
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

ReactDOM.render(<Logout />, document.getElementById('logout'));