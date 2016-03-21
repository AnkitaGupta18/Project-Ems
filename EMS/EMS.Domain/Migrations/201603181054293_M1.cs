namespace EMS.Domain.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class M1 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        EmployeeId = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        DeletedAt = c.DateTime(),
                        CreatedById = c.Int(nullable: false),
                        UpdatedById = c.Int(nullable: false),
                        DeletedById = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Employees", t => t.EmployeeId, cascadeDelete: true)
                .Index(t => t.EmployeeId);
            
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Password = c.String(),
                        UserName = c.String(),
                        EmployeeType = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        DeletedAt = c.DateTime(),
                        CreatedById = c.Int(nullable: false),
                        UpdatedById = c.Int(nullable: false),
                        DeletedById = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ProjectInformations", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.ProjectInformations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        Description = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        DeletedAt = c.DateTime(),
                        CreatedById = c.Int(nullable: false),
                        UpdatedById = c.Int(nullable: false),
                        DeletedById = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Events",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        RequestDate = c.DateTime(nullable: false),
                        EventType = c.Int(nullable: false),
                        Status = c.Boolean(nullable: false),
                        ProjectId = c.Int(nullable: false),
                        VisitorId = c.Int(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        DeletedAt = c.DateTime(),
                        CreatedById = c.Int(nullable: false),
                        UpdatedById = c.Int(nullable: false),
                        DeletedById = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.ProjectInformations", t => t.ProjectId, cascadeDelete: true)
                .ForeignKey("dbo.VisitorInformations", t => t.VisitorId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.VisitorId);
            
            CreateTable(
                "dbo.VisitorInformations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        CompanyName = c.String(),
                        Address = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        ZipCode = c.Int(nullable: false),
                        Phone = c.Int(nullable: false),
                        Email = c.String(),
                        Description = c.String(),
                        CreatedAt = c.DateTime(nullable: false),
                        UpdatedAt = c.DateTime(nullable: false),
                        DeletedAt = c.DateTime(),
                        CreatedById = c.Int(nullable: false),
                        UpdatedById = c.Int(nullable: false),
                        DeletedById = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Events", "VisitorId", "dbo.VisitorInformations");
            DropForeignKey("dbo.Events", "ProjectId", "dbo.ProjectInformations");
            DropForeignKey("dbo.Departments", "EmployeeId", "dbo.Employees");
            DropForeignKey("dbo.Employees", "ProjectId", "dbo.ProjectInformations");
            DropIndex("dbo.Events", new[] { "VisitorId" });
            DropIndex("dbo.Events", new[] { "ProjectId" });
            DropIndex("dbo.Employees", new[] { "ProjectId" });
            DropIndex("dbo.Departments", new[] { "EmployeeId" });
            DropTable("dbo.VisitorInformations");
            DropTable("dbo.Events");
            DropTable("dbo.ProjectInformations");
            DropTable("dbo.Employees");
            DropTable("dbo.Departments");
        }
    }
}
