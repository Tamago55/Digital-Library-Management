const { useState } = React;
const AmazonCognitoIdentity = window.AmazonCognitoIdentity;
const AWS = window.AWS;

const Login = () => {
  const [auth, setAuth] = useState({ email: "", password: "" });

  const authenticationData = {
    Username: auth.email,
    Password: auth.password,
  };

  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const poolData = {
    UserPoolId: "us-east-1_j65v1tuH7",
    ClientId: "77fs4nul5q1k9lvseplddqbo88",
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: auth.email,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  const handleChange = (e) => {
    const newAuth = { ...auth };
    newAuth[e.target.id] = e.target.value;
    setAuth(newAuth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();

        // Save the token to the local storage
        localStorage.setItem('token', accessToken);

        AWS.config.region = "us-east-1";

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "us-east-1:c12065d0-6c38-4013-862b-d6cc270863eb",
          Logins: {
            "cognito-idp.us-east-1.amazonaws.com/us-east-1_j65v1tuH7": result
              .getIdToken()
              .getJwtToken(),
          },
        });

        AWS.config.credentials.refresh((error) => {
          if (error) {
            alert(error.message || JSON.stringify(error));
            // console.log(error);
          } else {
            console.log(accessToken);
          }
        });

        // Redirect to index.html
        window.location.href = "index.html";
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email   : 
          <input
            type="email"
            id="email"
            value={auth.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <br />
        <label>
          Password: 
          <input
            type="password"
            id="password"
            value={auth.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <div>
          <button type="submit">Send</button>
        </div>
      </form>
      <br />
    </div>
  );
};

ReactDOM.render(<Login />, document.getElementById('login'));

