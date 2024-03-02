const Verify = () => {
    const [auth, setAuth] = React.useState({ username: "", verify: null });
  
    const poolData = {
      UserPoolId: "us-east-1_j65v1tuH7",
      ClientId: "77fs4nul5q1k9lvseplddqbo88",
    };
  
    const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
  
    const userData = {
      Username: auth.username,
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
  
      cognitoUser.confirmRegistration(auth.verify, true, function (err, result) {
        if (err) {
          console.log(err.message || JSON.stringify(err));
          return;
        }
        console.log("Success!");
      });
    };
  
    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Email: 
            <input
              type="text"
              id="username"
              value={auth.username}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <br/>
          <label>
            Verification code: 
            <input
              type="text"
              id="verify"
              value={auth.verify}
              onChange={(e) => handleChange(e)}
            />
          </label>
          <div>
            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    );
  };
  
  ReactDOM.render(<Verify />, document.getElementById('verify'));
  