import { run } from '../automation/inj';


run(async () => {
    console.log('doing great over here!');
    document.getElementById('body').style.backgroundColor = 'red';
    await new Promise(r => setTimeout(r, 2500));
    return { success: true };
}, [/https?:\/\/.*.google.com/]);


