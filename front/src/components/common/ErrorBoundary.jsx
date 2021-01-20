import React, { Component } from 'react';

class errorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error, info) {
    this.setState({
      error: true,
    });
    console.log({ error, info });
  }

  render() {
    if (this.state.error)
      return (
        <div>
          <p>에러가 발생했습니다.</p>
          <p>다시 시도해주세요.</p>
          <p>에러가 계속 발생한다면 관리자에게 문의해주세요.</p>
        </div>
      );
    return this.props.children;
  }
}

export default errorBoundary;
