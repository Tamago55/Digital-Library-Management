const SignUp = () => {
  const [auth, setAuth] = React.useState({ email: "", password: "" });

  const poolData = {
    UserPoolId: "us-east-1_j65v1tuH7",
    ClientId: "77fs4nul5q1k9lvseplddqbo88",
  };

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const attributeList = [];

  const dataEmail = {
    Name: "email",
    Value: auth.email,
  };

  const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  const handleChange = (e) => {
    const newAuth = { ...auth };
    newAuth[e.target.id] = e.target.value;
    setAuth(newAuth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    userPool.signUp(
      auth.email,
      auth.password,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          console.log(err.message || JSON.stringify(err));
          return;
        }
        var cognitoUser = result.user;
        console.log("Email is " + cognitoUser.getUsername());
      }
    );
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email          : 
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

ReactDOM.render(<SignUp />, document.getElementById('signup'));
