import React, { Component } from 'react';
import { FlexyFlipCard } from 'flexy-flipcards';

class Flip extends Component {
    render() {
        return (
            <FlexyFlipCard
                frontBackgroundColor="#B96aC9"
                backBackgroundColor="#231b1b"
            >
                <div>
                  <div ref="flipper">
                    Front
                  </div>
                </div>
                <div>
                  <div ref="flipper">
                    Back
                  </div>
                </div>
            </FlexyFlipCard>
        );
    }
}

export default Flip;
