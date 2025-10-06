package com.algamoney.api.repository.pessoa;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.algamoney.api.model.Pessoa;
import com.algamoney.api.repository.filter.PessoaFilter;

public interface PessoaRepositoryQuery {

	public Page<Pessoa> filter(PessoaFilter pessoaFilter, Pageable pageable);

	public Page<Pessoa> listPeople(PessoaFilter pessoaFilter, Pageable pageable);
}
