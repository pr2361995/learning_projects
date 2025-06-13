class User {
    constructor(title, date) {
      this.title = title;
      this.date = date;
    }
    static staticMethod = () => {
      // remember this  = Article
      return new this("title", "date");
    };
  }
  
  const user = User.staticMethod();
  console.log(user);
  