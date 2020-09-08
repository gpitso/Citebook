

var UserProfile = (function() {
    var email = "";
    var password = "";
    var isLoggedIn=false;
  
    var getEmail = function() {
      return this.email;    // Or pull this from cookie/localStorage
    };

    var getPass = function() {
        return this.password;    // Or pull this from cookie/localStorage
      };
    
    var getLoggedIn = function() {
        return isLoggedIn;    // Or pull this from cookie/localStorage
    };
  
    var setEmail = function(email) {
      this.email = email;     
      // Also set this in cookie/localStorage
    };

    var setPass = function(password) {
        this.password = password;     
        // Also set this in cookie/localStorage
    };

    var setLoggedIn = function(isLoggedIn) {
        this.isLoggedIn = isLoggedIn;     
        // Also set this in cookie/localStorage
    };
  
      return {
        getEmail: getEmail,
        getPass: getPass,
        getLoggedIn: getLoggedIn,
        setEmail: setEmail,
        setPass: setPass,
        setLoggedIn:setLoggedIn
      }
  
  })();
  
  export default UserProfile;