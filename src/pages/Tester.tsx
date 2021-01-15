import React, { useEffect, useState } from 'react';

// 'Tester' functional component definition:
const Tester = () => {
  const [testerBool, setTesterBool] = useState(false);

  // 'handleInputChange' function definition:
  const handleInputChange = (e: any) => {
    setTesterBool(e.target.checked);
  }

  // useEffect hook (monitors loudly):
  useEffect(() => {
    console.log('testerBool: ', testerBool);
  })

  // 'return' render:
  return (
    <form >
      <label style={{padding: 3}}>
        <input
          name="testBox"
          type="checkbox"
          checked={testerBool}
          onChange={handleInputChange} />
      </label>
      Multiplayer? (test)
    </form>
  );
}

export default Tester;  