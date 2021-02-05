// This is a Recoil atom which is responsible for maintaining state of
// the text used to

import { atom } from 'recoil';

const ILTPState = atom({
    key: 'ILTPState',
    default: "This is an empty ILTP",
});

export default ILTPState;