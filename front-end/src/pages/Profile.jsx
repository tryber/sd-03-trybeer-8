import React, { useEffect } from 'react';
import MenuTop from '../components/MenuTop';
import Footer from '../components/Footer';
import { useState } from 'react';

const putLogin = (username, userEmail) => {
  try {
    const {
      data,
      status,
    } = await axios.put('http://localhost:3001/login', {
      username,
      userEmail,
    });
    const statusOk = 200;
    if (status === statusOk) {
      // localStorage.setItem('user', JSON.stringify(data));
      // setIsRedirect({isRedirect: true, role: data.role});
    }
  } catch (err) {
    setErrorMessage(err.message);
  }
}

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  useEffect(() => {
    const { email, name } = JSON.parse(localStorage.getItem('user'));
    setUserEmail(email);
    setUserName(name);
  }, []);
  return (
    <div>
      <div className="body">
        <MenuTop title="Meu Perfil" />
        <div className="body_form">
          <center>
            <div className="div_form">
              <form className="form">
                <div className="form-group">
                  <label htmlFor="name" className="txt_label">
                    Nome
                    <input
                      className="ipt_form"
                      placeholder="Nome Completo"
                      type="text"
                      data-testid="profile-name-input"
                      name="name"
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                        setBtnIsDisabled(e.target.value.length > 12);
                      }}
                      required
                    />
                  </label>
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="txt_label">
                    Email
                    <input
                      className="ipt_form"
                      placeholder="Email"
                      type="text"
                      data-testid="profile-email-input"
                      name="email"
                      value={userEmail}
                      required
                    />
                  </label>
                </div>
                <div className="div_btn">
                  <button
                    disabled={btnIsDisabled}
                    type="button"
                    data-testid="data-testid="
                    profile-save-btn
                    className="btn_ok"
                    onClick={() => putLogin(userName, userEmail)}
                  >
                    Salvar
                  </button>
                  {/* <span>{errorMessage}</span> */}
                </div>
              </form>
            </div>
          </center>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
