import { useSelector } from 'react-redux';

function Header() {
  const state = useSelector((state) => state);
  console.log('Header ', state.loggedin.Username);
  return (
    <div className="jumbotron p-3 mb-0 rounded-0 bg-light ">
      <img
        src={'helpinghandlogo.jpg'}
        style={{ width: '100px', height: '40px' }}
        className="float-left"
      />
      {state.loggedin.IsLoggedIn ? (
        <>
          {/* <h5 className="float-left">Role : {state.loggedin.Role}</h5> */}
          <h5 className="float-right">
            Welcome ! {state.loggedin.Username}
          </h5>{' '}
        </>
      ) : (
        ''
      )}
      <h4 className=" font_design text-center text-dark font-weight-bold">
        Welcome to Helping-Hand
      </h4>
      <div className="clearfix"></div>
    </div>
  );
}

export default Header;
