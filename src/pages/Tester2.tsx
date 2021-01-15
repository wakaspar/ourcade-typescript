import React, { useState } from 'react';

interface TesterState {
    name: any,
    value: any,
    testerBool: any,
}

// 'Tester' functional component definition (w/ hooks):
const Tester2 = (state: TesterState) => {
//   const [setState] = useState();
  const [testerBool, setTesterBool] = useState();

  const handleInputChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.checked;

    // setState({
    //   [name]: value
    // });

    const obj: any = {
        [name]: value
    }

    setTesterBool(obj);

    console.log('state: ', state);
  }

  return (
    <form>
      <label>
        testerBool
        <input
          name="testerBool"
          type="checkbox"
          checked={testerBool}
          onChange={handleInputChange} 
        />
      </label>
    </form>
  );
}

// export default Tester;


