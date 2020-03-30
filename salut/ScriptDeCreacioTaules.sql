DROP TABLE Usuari;
CREATE TABLE Usuari(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Correu VARCHAR (250),
    Contrassenya VARCHAR (250)
);

DROP TABLE Perfil;
CREATE TABLE Perfil(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    UsuariId INT NOT NULL,
    Nom VARCHAR (50),
    Cognoms VARCHAR (100),
    DataNaixement date,
    Pes float,
    Alcada float,
    Genere VARCHAR(10),
    foreign key (UsuariId)
		REFERENCES Usuari(Id)
);

DROP TABLE Visita;
CREATE TABLE Visita(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PerfilId INT NOT NULL,
    DataVisita datetime,
    Ubicacio VARCHAR(250),
    Descripcio VARCHAR(400),
    TractamentId INT,
	foreign key (PerfilId)
		REFERENCES Perfil(Id),
	foreign key (TractamentId) references Tractament (Id)
);

DROP TABLE Tractament;
CREATE TABLE Tractament(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    PerfilId INT NOT NULL,
    DataInici datetime,
    DataFinal datetime,
	foreign key (PerfilId)
		REFERENCES Perfil(Id)
);

DROP TABLE Medicament;
CREATE TABLE Medicament(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nom varchar(150),
    Descripcio VARCHAR (400)
);

DROP TABLE Periodicitat;
CREATE TABLE Periodicitat(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    TractamentId INT NOT NULL,
    MedicamentId INT NOT NULL,
    Periode VARCHAR (50),
    foreign key (TractamentId) references Tractament (Id),
    foreign key (MedicamentId) references Medicament (Id)
);

DROP TABLE Alergia;
CREATE TABLE Alergia(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PerfilId INT NOT NULL,
    Nom varchar(100),
    Descripcio VARCHAR (400),
    foreign key (PerfilId)
		REFERENCES Perfil(Id)
)

DROP TABLE Patologia;
CREATE TABLE Patologia(
	Id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	PerfilId INT NOT NULL,
    Nom varchar(100),
    Descripcio VARCHAR (400),
    foreign key (PerfilId)
		REFERENCES Perfil(Id)
)