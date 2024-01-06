//
//  ViewController.swift
//  CaptureIt
//
//  Created by Tasawar Saraf on 12/30/23.
//

import UIKit

class LoginViewController: UIViewController {
    
    let titleLabel = UILabel()
    let titleDescriptionLabel = UILabel()
    let loginView = LoginView()
    let signInButton = UIButton(type: .system)
    let errorMessageLabel = UILabel()
    
    
    /**save these values**/
    
    var username: String?{
        return loginView.usernameTextField.text
    }
    
    var password: String?{
        return loginView.passwordTextField.text
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        style()
        layout()
    }
    
}



extension LoginViewController{
    private func style(){
        
        titleLabel.translatesAutoresizingMaskIntoConstraints = false
        titleLabel.text = "CaptureIt"
        //titleLabel.font = UIFont.preferredFont(forTextStyle: .largeTitle)
        titleLabel.font = UIFont.boldSystemFont(ofSize: 30)  // You can adjust the font size as needed
        titleLabel.textAlignment = .center

        
        titleDescriptionLabel.translatesAutoresizingMaskIntoConstraints = false
        titleDescriptionLabel.text = "Capture and share your world, one beautiful photo at a time."
        titleDescriptionLabel.textAlignment = .center
        titleDescriptionLabel.numberOfLines = 0
        titleDescriptionLabel.font = UIFont.preferredFont(forTextStyle: .title2)
        
        loginView.translatesAutoresizingMaskIntoConstraints = false
        
        signInButton.translatesAutoresizingMaskIntoConstraints = false
        signInButton.configuration = .filled()
        signInButton.configuration?.imagePadding = 8
        signInButton.setTitle("Login", for: [])
        signInButton.configuration?.baseBackgroundColor = .black
        signInButton.addTarget(self, action: #selector(signInTapped), for: .primaryActionTriggered)
        
        errorMessageLabel.translatesAutoresizingMaskIntoConstraints = false
        errorMessageLabel.textAlignment = .center
        errorMessageLabel.textColor = .systemRed
        errorMessageLabel.numberOfLines = 0 //multiline
        errorMessageLabel.isHidden = true
        errorMessageLabel.text = "Error Message"
        
    }
    
    private func layout(){
        view.addSubview(titleLabel)
        view.addSubview(titleDescriptionLabel)
        view.addSubview(loginView)
        view.addSubview(signInButton)
        view.addSubview(errorMessageLabel)
        
        
        
        NSLayoutConstraint.activate([
            
            // title label
            titleLabel.topAnchor.constraint(equalToSystemSpacingBelow: view.safeAreaLayoutGuide.topAnchor, multiplier: 7),
//            titleLabel.centerYAnchor.constraint(equalTo: view.centerYAnchor, constant: -10),
            titleLabel.leadingAnchor.constraint(equalToSystemSpacingAfter: view.leadingAnchor, multiplier: 2),
            view.trailingAnchor.constraint(equalToSystemSpacingAfter: titleLabel.trailingAnchor, multiplier: 2),
            
            
            // title label description
            titleDescriptionLabel.topAnchor.constraint(equalToSystemSpacingBelow: titleLabel.bottomAnchor, multiplier: 2),
            titleDescriptionLabel.leadingAnchor.constraint(equalToSystemSpacingAfter: view.leadingAnchor, multiplier: 1),
            view.trailingAnchor.constraint(equalToSystemSpacingAfter: titleDescriptionLabel.trailingAnchor, multiplier: 1),
            
            
            // loginView
            // loginView.centerYAnchor.constraint(equalTo: view.centerYAnchor),
            loginView.topAnchor.constraint(equalToSystemSpacingBelow: titleDescriptionLabel.bottomAnchor, multiplier: 2),
            loginView.leadingAnchor.constraint(equalToSystemSpacingAfter: view.leadingAnchor, multiplier: 1),
            view.trailingAnchor.constraint(equalToSystemSpacingAfter: loginView.trailingAnchor, multiplier: 1),
            
            // signInButton
            signInButton.topAnchor.constraint(equalToSystemSpacingBelow: loginView.bottomAnchor, multiplier: 2),
            signInButton.leadingAnchor.constraint(equalToSystemSpacingAfter: view.leadingAnchor, multiplier: 1),
            view.trailingAnchor.constraint(equalToSystemSpacingAfter: signInButton.trailingAnchor, multiplier: 1),
            
            // errorMessageLabel
            errorMessageLabel.topAnchor.constraint(equalToSystemSpacingBelow: signInButton.bottomAnchor, multiplier: 1),
            errorMessageLabel.leadingAnchor.constraint(equalToSystemSpacingAfter: view.leadingAnchor, multiplier: 2),
            view.trailingAnchor.constraint(equalToSystemSpacingAfter: errorMessageLabel.trailingAnchor, multiplier: 2)
            
        ])
    }
}

//
extension LoginViewController{
    @objc func signInTapped(sender: UIButton){
        errorMessageLabel.isHidden = true
        login()
    }
    
    private func login(){
        /**this is an optional string but we need to try to unwrap**/
        guard let username = username, let password = password else{
            /**Programmer error**/
            assertionFailure("Username and password can't be nil")
            return
        }
        
        if username.isEmpty || password.isEmpty{
            configureView(withMessage: "Username / password can't be blank")
            return
        }
        
        if username == "Taz" && password == "Password"{
            signInButton.configuration?.showsActivityIndicator = true
        } else{
            configureView(withMessage: "Incorrect username / password")
        }
    }
    
    
    private func configureView(withMessage message: String){
        errorMessageLabel.isHidden = false
        errorMessageLabel.text = message
    }
}

