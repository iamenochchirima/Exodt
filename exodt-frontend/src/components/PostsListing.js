import ConfirmRemovalModal from "./ConfirmRemovalModal";

class StudentList extends Component {
  render() {
    const posts = this.props.posts;
    return (
      <Table dark>
        <thead>
          <tr>
            <th>Content</th>
            <th>Image</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {!posts || posts.length <= 0 ? (
            <tr>
              <td colSpan="6" align="center">
                <b>Ops, no one here yet</b>
              </td>
            </tr>
          ) : (
            posts.map(post => (
              <tr key={post.pk}>
                <td>{post.content}</td>
                <td>{post.image}</td>
                <td>{post.created}</td>
                <td align="center">
                  <NewStudentModal
                    create={false}
                    post={post}
                    resetState={this.props.resetState}
                  />
                  &nbsp;&nbsp;
                  <ConfirmRemovalModal
                    pk={post.pk}
                    resetState={this.props.resetState}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    );
  }
}

export default StudentList;