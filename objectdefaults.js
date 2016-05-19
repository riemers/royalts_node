const objectdefaults = {};

objectdefaults.RoyalSSHConnection = [
    {name: 'IsAdHoc', value: 'False'},
    {name: 'IsConnectionTemplate', value: 'False'},
    {name: 'InitialStateOfKeyboardScrolling', value: 'True'},
    {name: 'CredentialFromParent', value: 'True'},
    {name: 'HistoryMaxLength'}
];

objectdefaults.RoyalFolder = [
    {name: 'IsExpanded', value: 'False'},
    {name: 'CredentialMode', value: '3'},
    {name: 'CredentialAutologon', value: 'True'},
    {name: 'CredentialFromParent', value: 'True'}
];

objectdefaults.RoyalDocument = [
    {name: 'DocumentType', value: 'Workspace'},
    {name: 'CredentialMode', value: '3'},
    {name: 'CredentialName', value: 'Unix'},
    {name: 'CredentialAutoLogon', value: 'True'},
    {name: 'CredentialMode', value: '4'}
];

export default objectdefaults;