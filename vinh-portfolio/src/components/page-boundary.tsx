import { Component, type ReactNode } from 'react';
import { Recovery } from './recovery';

export class PageBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    return this.state.error
      ? <Recovery error={this.state.error} retry={() => location.reload()} />
      : this.props.children;
  }
}
