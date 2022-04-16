import { Close } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { NC_LOGO } from '../data';

const AddtoHomeScreen = () => {
  const [btn, setBtn] = useState(null);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!btn) {
      let deferredPrompt;
      const addWrapper = document.querySelector('#add-to-home');
      const addBtn = document.querySelector('#add-button');
      addWrapper.style.display = 'none';
      setHide(true);
      setBtn(addBtn);
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;
        // Update UI to notify the user they can add to home screen
        setHide(false);
        addWrapper.style.display = 'inline-block';

        addBtn.addEventListener('click', (e) => {
          // hide our user interface that shows our A2HS button
          addWrapper.style.display = 'none';
          // Show the prompt
          deferredPrompt.prompt();
          // Wait for the user to respond to the prompt
          deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
        });
      });
    }
  }, [btn]);

  useEffect(() => {
    if (hide) {
      const addWrapper = document.querySelector('#add-to-home');
      addWrapper.style.display = 'none';
    }
  }, [hide]);

  return (
    <div className='add-to-home' id='add-to-home'>
      <div className='logo-name-wrapper'>
        <img src={NC_LOGO} alt='' />
        <div>
          <strong>NICED Craves</strong>{' '}
          <small>niced-craves-ordering-system.web.app</small>
        </div>
        <button type='button' className='close-add-wrapper'>
          <Close onClick={() => setHide(true)} />
        </button>
      </div>
      <button type='button' id='add-button'>
        Add to Home Screen
      </button>
    </div>
  );
};

export default AddtoHomeScreen;
