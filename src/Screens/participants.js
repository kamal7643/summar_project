import React from 'react';
import './css/participants.css';

function Participants(props) {
    const user = props.location.state.e;
    return(
        <div className="profile">
            <table className="table">
                <body>
                    <tr className="tr">
                        <td className="td">Play Name  </td>
                        <td className="td">:</td>
                        <td className="td">{user.playname}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Name  </td>
                        <td className="td">:</td>
                        <td className="td">{user.name}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Matchs  </td>
                        <td className="td">:</td>
                        <td className="td">{user.matches}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Win  </td>
                        <td className="td">:</td>
                        <td className="td">{user.win}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Loss </td>
                        <td className="td">:</td>
                        <td className="td">{user.loss}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Kills  </td>
                        <td className="td">:</td>
                        <td className="td">{user.kills}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Deaths  </td>
                        <td className="td">:</td>
                        <td className="td">{user.deaths}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">KD  </td>
                        <td className="td">:</td>
                        <td className="td">{user.kd}</td>
                    </tr>
                    <tr className="tr">
                        <td className="td">Points  </td>
                        <td className="td">:</td>
                        <td className="td">{user.points}</td>
                    </tr>
                </body>
            </table>
        </div>
    );
}

export default Participants;