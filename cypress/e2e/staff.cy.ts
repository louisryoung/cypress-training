describe("Check filters", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  it("Check account type (Picker)", () => {
    cy.get("#account-type select")
      .select("picker")
      .invoke("val")
      .should("eq", "picker");
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i]).contain("picker");
      }
    });
  });
  it("Check account type (FullTime)", () => {
    cy.get("#account-type select")
      .select("fullTime")
      .invoke("val")
      .should("eq", "fullTime");
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i]).contain("fullTime");
      }
    });
  });
  it("Check account type (Manager)", () => {
    cy.get("#account-type select")
      .select("manager")
      .invoke("val")
      .should("eq", "manager");
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i]).contain("manager");
      }
    });
  });
  it("Check account type (TeamLeader)", () => {
    cy.get("#account-type select")
      .select("teamLeader")
      .invoke("val")
      .should("eq", "teamLeader");
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i]).contain("teamLeader");
      }
    });
  });
  it("Check account type (Owner)", () => {
    cy.get("#account-type select")
      .select("owner")
      .invoke("val")
      .should("eq", "owner");
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i]).contain("owner");
      }
    });
  });

  it("Check name search (Harry)", () => {
    cy.get("input").type("harry");
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      for (let i = 0; i < rows.length; i++) {
        expect(rows[i]).contain("Harry");
      }
    });
  });
});

describe("Check pagintion", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  it("Check 20 per page", () => {
    cy.get(".ag-center-cols-clipper .ag-row").should((rows) => {
      expect(rows).to.have.length(20);
    });
  });
  it("Paginate to 2", () => {
    cy.get("[role = 'navigation'] li a").contains("2").click();
    cy.get("[role = 'navigation'] li")
      .contains("2")
      .parent()
      .should((button) => {
        expect(button).to.class("border-[#DF1D00]");
      });
  });
});

describe("Check select columns", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  it("Check  drawer", () => {
    cy.get("#select-column").click();
    cy.get("#select-column-panel").should("be.visible");
  });
  it("Check drag&drop", () => {
    cy.get("#select-column").click();
    cy.get("#item-firstName").click();
    cy.get("#item-lastName").click();
    const emailItem = cy.get("#item-email");
    emailItem.should("be.visible");
    emailItem.click();
    emailItem.move({ deltaX: 0, deltaY: -250, force: true });

    cy.get("#select-column-confirm").click();

    cy.get(".ag-header-cell-text").should((rows) => {
      console.log(rows);
      expect(rows[0]).contain("Employee ID");
      expect(rows[4]).contain("Email Address");
    });
  });
});
