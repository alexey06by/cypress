describe("Prior Online Demo", function(){
    beforeEach(function(){
        cy.visit(Cypress.env('BASE_URL'));
        cy.contains('Демо-версия').click();
    });

    it("Should display cards in demo-version", function(){
        cy.get('#allProducts .panel-card-text-content').should('be.visible');
        cy.get('#allProducts .panel-card-text-content').should(($err) => {
            expect($err).to.contain('Зарплатная карта');
        });

        cy.get('#allProducts [title="Валютная ЕВРО"]').should('be.visible');
        cy.get('#allProducts [title="Валютная ЕВРО"]').should(($err) => {
            expect($err).to.contain('Валютная ЕВРО');
        }); 
        
        cy.get('#allProducts .bx-next').click(); 

        cy.get('#allProducts [title="Интернет-покупки"]').should('be.visible');
        cy.get('#allProducts [title="Интернет-покупки"]').should(($err) => {
            expect($err).to.contain('Интернет-покупки');
        });           
    });

    it("Should logout from demo version (with intercept)", function(){
        cy.intercept('GET', '**/Bia.Portlets.Mc.Default.Membership.Login.Prior/Login/Logoff').as('logOff');
        cy.get('.icon-logout').click();

        cy.wait('@logOff').then((fullResponse)=>{
            expect(fullResponse.response?.statusCode).to.be.equal(302);
        });

        cy.url().should('equal', 'https://prior.by/web/');
        cy.screenshot();            
    });

    it("Should repeat payment", function(){
        cy.get('li:first-child .check-repeat-btn>button').click();
        cy.get('#Amount').type('10');
        cy.contains('Оплатить').click();
        cy.get('.form_part_mid .btn-primary:last-child').click();
        cy.contains('Оплатить').click();

        cy.get('.success>span').should('be.visible');
        cy.get('.success>span').should('contain.text', 'Платеж успешно совершен'); 
        
        cy.get('li:nth-child(2) .k-link').click();

        cy.get('.row:nth-child(15)').should('contain.text', '10 BYN'); 
        
        cy.contains('Завершить').click();
        
        cy.get('.wizard-wrapper').should('not.exist'); 
    });    

});