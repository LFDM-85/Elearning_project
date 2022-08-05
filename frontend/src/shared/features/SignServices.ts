import axios from '../../interceptors/axios';

export const signin = (route: string, inputs: any) => {
  axios
    .post(route, inputs, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
    .then((res) => {
      // const accessToken = res.data.token;
      // const user = res.data.user;
      console.log(res.data);
      console.log('User logged In');
      return res.data;
    })
    .catch(function (error) {
      alert('User not found!');
      console.log(error.message);
    });
};
export const signup = (route: string, inputs: any) => {
  axios
    .post(route, inputs)
    .then((res) => {
      if (res.status === 201) {
        alert('User was created! Please Sign In');
        console.log('User created');
        return;
      }
    })
    .catch(function (error) {
      alert('Email already exists!');
      console.log(error.message);
      return;
    });
};
// export const signToken = () => {};
export const signout = () => {
  axios.post('/auth/signout', {}, { withCredentials: true }).then((res) => {
    alert('User logged Out');
    console.log('User logged Out');
    localStorage.clear();
  });
};
