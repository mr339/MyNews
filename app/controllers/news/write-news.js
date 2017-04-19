import Ember from 'ember';

export default Ember.Controller.extend({
  progress: 0,
  title : '',
  details : '',
  name : '',
  progress: '',
  isDisabled : Ember.computed.empty('progress','details','title','name'),

  actions:{
      writeNews(){
          var images = this.get('img');
          var title = this.get('title');
          var details = this.get('details');
          var name = this.get('name');
          var date = this.get('date');
          var image = images;

        if (title !== '' && details !== '' && name !== '')
        {
            if(details.length>=20)
            {
                  alert('Required fields entered, news successfully posted');
                  var newTask = this.store.createRecord('news',{
                  title: title,
                  details : details,
                  name : name,
                  date : new Date(date),
                  image : image
                 });

                  //save to database
                  newTask.save();

                  //clear form
                  this.setProperties({
                    title: '',
                    details:'',
                    name:'',
                    date:'',
                  });

                }
            else
            {
              alert('Details should have atleast 20 letters');
              return false;
            }
        }
        else
        {
          alert('All fields are required!');
          return false;
        }
     },


    didSelectFiles(data) {
      const storageRef = window.firebase.storage().ref();
      let file = data;
      var uploadTask = storageRef.child('images/' + file[0].name).put(file[0]);
      uploadTask.on(window.firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          this.set('progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
          this.set('progress', progress);
          switch (snapshot.state) {
            case window.firebase.storage.TaskState.PAUSED:
              this.set('status', 'Upload is paused');
              break;
            case window.firebase.storage.TaskState.RUNNING:
              this.set('status', 'Upload is running');
              break;
          }
        }, (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
        }
      }, () => {
       let image = this.set('downloadURL', uploadTask.snapshot.downloadURL);
       this.set('img', image);
      });
    }
  }
});
