import Ember from 'ember';

export default Ember.Controller.extend({
  email: '',
  name: '',
  phone: '',
  feedback: '',
  isDisabled: Ember.computed.empty('feedback','email','name','phone'),
   actions: {
    add(){
        var name = this.get('name');
        var email = this.get('email');
        var select = this.get('selected');
        var date = this.get('date');
        var phone = this.get('phone');
        var feedback = this.get('feedback');
        var emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (name !== '' && email !== '' && phone !== '' && feedback !== '')
        {
            if (email.match(emailReg))
            {
                 if(phone.length >= 10)
                 {
                      alert("All entered values are valid.Form successfylly validated");
                      var newTask = this.store.createRecord('contact',{
                      name: name,
                      email : email,
                      date : new Date(date),
                      select : select,
                      phone: phone,
                      feedback: feedback,
                      date: date,
                    });

                    //save to database
                    newTask.save();

                    //clear form
                    this.setProperties({
                      name: '',
                      email:'',
                      date: null,
                      phone:'',
                      feedback: ''
                    });
                 }
                 else
                 {
                    alert('Enter contact number of atleast 10 digits');
                    return false;
                 }
            }
            else
            {
              alert("Enter a valid Email address");
              return false;
            }
        }
        else
        {
          alert('All fields are required');
          return false;
        }
      },

      dropdown(data){
        var select= data;
        this.set('selected',select);
      }
    }
});
