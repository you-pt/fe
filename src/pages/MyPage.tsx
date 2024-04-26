import axios from 'axios';
import React from 'react';

function MyPage() {
  return (
    <div>
      <button onClick={async()=>{
          const token = localStorage.getItem("noti")
          await axios({
            method:"POST",
            url: "message/test2",
            data: {token}
          })
        }}>알림 테스트용</button>
    </div>
  );
}

export default MyPage;